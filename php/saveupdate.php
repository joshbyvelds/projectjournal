<?php
/**
 * Created by PhpStorm.
 * User: JoshB
 * Date: 5/6/2018
 * Time: 6:11 PM
 */

require_once('db.php');


if(isset($_POST['project'])){
    $project = $_POST['project'];
}

if(isset($_POST['title'])){
    $title = $_POST['title'];
}

if(isset($_POST['details'])){
    $details = $_POST['details'];
}

if(isset($_POST['image'])){
    $image = $_POST['image'];
}

if(isset($_POST['time'])){
    $time = $_POST['time'];
}

$json['error'] = false;
$json['success'] = true;
$json['error_message'] = '';

if(empty($project)){
    $json['error'] = true;
    $json['error_message'] .= "Missing Project ID for new update.\n";
}

if(empty($title)){
    $json['error'] = true;
    $json['error_message'] .= "Please enter a title for this update.\n";
}

if(empty($details)){
    $json['error'] = true;
    $json['error_message'] .= "Please enter a description for this update.\n";
}

if(empty($time)){
    $json['error'] = true;
    $json['error_message'] .= "Project time counter missing.\n";
}

$id = 0;

try {
    $update_id = 1;
    $sth = $dbh->prepare("SELECT id FROM updates WHERE project = ? ORDER BY id DESC LIMIT 1");
    $sth->bindParam(1, $project);
    $sth->execute();
    $updates_array = $sth->fetchAll();

    if(count($updates_array) > 0){
        $update_id = (int)$updates_array[0]['id'] + 1;
    }

    $date = date("Y-m-d H:i:s");

    $image = pathinfo($_FILES['update_image']['name']);
    $ext = $image['extension']; // get the extension of the file
    $newname = "project_". $project ."_". $update_id .".".$ext;


    $stmt = $dbh->prepare("INSERT INTO updates (project, title, details, image, date, time) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bindParam(1, $project);
    $stmt->bindParam(2, $title);
    $stmt->bindParam(3, $details);
    $stmt->bindParam(4, $newname);
    $stmt->bindParam(5, $date);
    $stmt->bindParam(6, $time);
    $stmt->execute();

    $target = '../assets/images/updates/'.$newname;

    $maxDim = 540;
    $file_name = $_FILES['update_image']['tmp_name'];
    list($width, $height, $type, $attr) = getimagesize( $file_name );
    if ( $width > $maxDim || $height > $maxDim ) {
        $target_filename = $file_name;
        $ratio = $width/$height;
        if( $ratio > 1) {
            $new_width = $maxDim;
            $new_height = $maxDim/$ratio;
        } else {
            $new_width = $maxDim*$ratio;
            $new_height = $maxDim;
        }
        $src = imagecreatefromstring( file_get_contents( $file_name ) );
        $dst = imagecreatetruecolor( $new_width, $new_height );
        imagecopyresampled( $dst, $src, 0, 0, 0, 0, $new_width, $new_height, $width, $height );
        imagedestroy( $src );
        imagepng( $dst, $target_filename ); // adjust format as needed
        imagedestroy( $dst );
    }

    move_uploaded_file( $_FILES['update_image']['tmp_name'], $target);

} catch (PDOException $e) {
    $json['error'] = true;
    $json['error_message'] = $e->getMessage();
}

if($json['error']){
    $json['success'] = false;
    echo json_encode($json);
    die();
}