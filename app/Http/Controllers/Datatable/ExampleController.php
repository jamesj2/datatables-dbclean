<?php

namespace App\Http\Controllers\Datatable;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use
    DataTables\Database,
    DataTables\Editor,
    DataTables\Editor\Field,
    DataTables\Editor\Format,
    DataTables\Editor\Mjoin,
    DataTables\Editor\Options,
    DataTables\Editor\Upload,
    DataTables\Editor\Validate,
    DataTables\Editor\ValidateOptions;
use League\Flysystem\Adapter\Local;
use League\Flysystem\Filesystem;

class ExampleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $db = DB::connection()->getPdo();

        $table = 'users';
        $alias = 'u';
        $index = 'id';

        $uploadPath = public_path('files');
        $adapter = new Local($uploadPath,
            LOCK_EX,
            Local::SKIP_LINKS,
            [
                'file' => [
                    'public' => 0744,
                    'private' => 0700,
                ],
                'dir' => [
                    'public' => 0755,
                    'private' => 0700,
                ]
            ]);
        $filesystem = new Filesystem($adapter);

        // Build our Editor instance
        $result = Editor::inst( $db, $table, $index )
            ->fields(
                Field::inst( $table.'.'.$index, $alias.'.'.$index )
                    ->set( Field::SET_NONE ),
                Field::inst( $table.'.name', $alias.'.name' ),
                Field::inst( $table.'.email', $alias.'.email' ),
                Field::inst( $table.'.site', $alias.'.location' )
            )
            ->on('postUpload', function($editor,$id) use ($filesystem) {
                /**
                 * Move files from staging to production directory.
                 *   Read record to get system_path
                 *   Move file
                 *   Update record system_path
                 *   Create thumbnails
                 */

                $locationId = intval($_POST['loc_id']);

                // need system_path field
                $res = $editor->db()->select(
                    'lv_cable_request_files',
                    '*',
                    function ($q) use ($id) {
                        $q->where('id', (int)$id, '=');
                    }
                );
                $record = $res->fetch();

                // move file
                $filesystem->rename($record['system_path'],$locationId.'/'.basename($record['system_path']));
                $file = basename($record['system_path']);

                /**
                 * Update database
                 */
                $editor->db()->update(
                    'lv_cable_request_files',
                    [
                        'system_path' => $file
                    ],
                    function ($q) use ($id) {
                        $q->where('id', $id);
                    }
                );
            })
            ->debug((env('APP_ENV') === 'local') ? true : false);

        return response()->json($result);
    }
}
