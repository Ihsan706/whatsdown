<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$maxSize = 10;
$UPLOAD_DIR = "files/";
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
$maxSize *= 1024 * 1024;

ini_set('display_errors', 1);
error_reporting(E_ALL);

// Log received data
file_put_contents('debug.log', print_r([
    'POST' => $_POST,
    'FILES' => $_FILES,
    'INPUT' => file_get_contents('php://input')
], true), FILE_APPEND);

if (isset($_POST['upload']) && isset($_FILES['file'])) {
    // Your existing file handling code
    $file = $_FILES['file'];
    
	//if($file['size'] > $maxSize){}
	$fileContent = file_get_contents($file['tmp_name']);
	$fileHash = hash('sha256', $fileContent);
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
	
	$filename = $fileHash . '.' . $extension;
	if($extension == "mp4"){
		echo "<video class='mov' controls><source src='chats/files/".$filename."'></video>";
	}else{
	    echo "<img class='photos' src='chats/files/".$filename."'>";
	}
	move_uploaded_file($file['tmp_name'], $UPLOAD_DIR . $filename);
	
    if (!is_link("chats/files")) {
    // Create the symlink - note the argument order
    @symlink(realpath("files/"), "chats/files");
    }
} else {
/*
    http_response_code(400);
    
    // Detailed error message
    $missing = [];
    if (!isset($_POST['upload'])) $missing[] = 'upload';
    if (!isset($_FILES['file'])) $missing[] = 'file';
    if (!isset($_POST['name'])) $missing[] = 'name';
    if (!isset($_POST['password'])) $missing[] = 'password';
    
    echo "Missing parameters: " . implode(', ', $missing);
	*/
}



date_default_timezone_set('Asia/Riyadh');

if (isset($_POST['action'])) {
    $name = $_POST['name'] ?? 'Unknown';
    $age = $_POST['age'] ?? 'Not provided';
    echo "Hello, $name! You are $age years old.";
}

if (isset($_POST['writing'])) {
    $group = $_POST['group'];
    $username = $_POST['name'];
    $text = $_POST['send'];
    //if($text != null && $text != ''){
    // Load existing data
    $jsonContent = file_get_contents('globals_cache.json');
    $Data = json_decode($jsonContent, true) ?: [];
    
    // Initialize group if not exists
    if (!isset($Data[$group])) {
        $Data[$group] = [];
    }
    
    // Create/update user with single text entry
    $Data[$group][$username] = [
        'texts' => [$text] // Always keep only the latest message
    ];
    
    // Save back to file
    file_put_contents('globals_cache.json', json_encode($Data, JSON_PRETTY_PRINT));
	//}else{
		
}

if (isset($_POST['update_conv'])) {
    $group = $_POST['group'];
    $username = $_POST['name'];
    
    $filename = "chats/".$group.".txt";
    $lines = file($filename, FILE_IGNORE_NEW_LINES);
      
    foreach($lines as $number => $chat){
        // [Keep all your original message parsing code]
        $name_and_msg_and_time = explode('__:',$chat);
        $name = $name_and_msg_and_time[0];
        $msg_and_time = $name_and_msg_and_time[1];
        $time_msg = explode('__time:__',$msg_and_time);
        $time = $time_msg[1];
        $msg = $time_msg[0];
        
        $t = explode('__',$time);
        $months = $t[0];
        $time = $t[1];
		
        $t2 = explode(' ',$time);
		$time = $t2[0];
		$PM = $t2[1];
        echo "<div class='message ";
        if($name != $username ){ echo "received'> <div class='message-bubble'>";
        }else{
        echo "sent'> <div class='message-bubble'>";
        }
        echo $msg;
        echo "<div class='timestamp'>". $name." | ";
        if (date('Y-m-d') != $months) echo $months.' / ';  echo $time; if (date('Y-m-d') != $months || date('A') != $PM ) echo " ".$PM; echo "</div></div></div>";
    }

    // Read from JSON instead of $GLOBALS
    if (file_exists('globals_cache.json')) {
        $globalData = json_decode(file_get_contents('globals_cache.json'), true) ?? [$group => ["whatsdown" => ["texts" => ["<h1>wait</h1>"]]]];
    foreach ($globalData[$group] as $Gname => $userData) {
    $Gtext = $userData['texts'][0] ?? 'no text'; // Take the first text entry
	if($Gtext != ''){
    echo "<div class='message ";
    if ($Gname != $username) {
        echo "received'> <div class='message-bubble'>";
    } else {
        echo "sent'> <div class='message-bubble'>";
    }
    echo $Gtext; // Sanitize output
	echo str_repeat("." ,rand(1,3));
    echo "<div class='timestamp'>" . $Gname;
    echo " | writing</div></div></div>";
}
}
	}
}

if(isset($_POST['send_msg'])){
	$group = $_POST['group'];
    $username = $_POST['name'];
	$send_msg = '
'.$username."__:".$_POST['message'].'__time:__'.date('Y-m-d__h:i:s A');
	if(isset($_POST['size'])){
		if($_POST['size'] == "big"){ 
		$send_msg = PHP_EOL.$username."__:<h1>".$_POST['message'].'</h1>__time:__'.date('Y-m-d__h:i:s A'); 
		}if($_POST['size'] == "smail"){ 
		$send_msg = PHP_EOL.$username."__:<h6>".$_POST['message'].'</h6>__time:__'.date('Y-m-d__h:i:s A'); 
		}
	}
	if($_POST['links'] === "true"){
		$send_msg = PHP_EOL.$username."__:<a href='".$_POST['link_url']."'>".$_POST['message'].'</a>__time:__'.date('Y-m-d__h:i:s A'); 
		}
	if($_POST['message'] != ''){
	$make_ac = fopen('chats/'.$group.'.txt','a');
	fwrite($make_ac , $send_msg);
	fclose($make_ac);
	}
}


if (isset($_POST['see_all_groups'])) {
	$username = $_POST['name'];
	
	$file = "ac_chats/".$username.".txt";
    if(file_exists($file)){
    $all_chats = file_get_contents($file);
    $chats = explode("____=new_group=____" , $all_chats);
}else{
	echo '__sec__faild';
	$chats = '__sec__ERROR ____=new_group=____ ERROR ____=new_group=____ ERROR';
}
	
foreach($chats as $chat_nuber => $chat_names){
		?><button type="submit" name="chats" value="<?php echo $chat_names; ?>" class="chose-chats" onclick="chose_chat('<?php echo $chat_names ; ?>');"><?php
		echo $chat_names;
		?></button><?php
	}
}

function make_an_acount(){
	if(!isset($_POST['sub'])){
	?>
	<title>sign in</title>
	<link rel="stylesheet" href="main.css"/>
	<link rel="stylesheet" href="sign_in.css"/>
	<form class="sign-in_form">
	<h1 class="sign-in_h1">make an acount or sign in</h1>
	<input class="sign-in_input" type="text" placeholder="type your username" id="sign-in-name" />
	<input class="sign-in_input" type="password" placeholder="password" id="password" />
	<input class="sign-in_button" type='button' name="sub" value="submit" onclick="make_an_ac()" />
	</form>
	<?php
	}
	if(isset($_POST['sub'])){
		$name = $_POST['name'];
		$password = $_POST['password'];
		
		$dose_ac_exsest = __DIR__.'/ac//'.$name.'.txt';
		if (!file_exists($dose_ac_exsest)){
		$make_ac = fopen($dose_ac_exsest,'w');
		fwrite($make_ac , $name.":");
		fwrite($make_ac , $password);
	    fclose($make_ac);
		}else{
			$name_pas = file_get_contents($dose_ac_exsest);
			$pastest = explode(':',$name_pas);
			$pass = $pastest[1];
		}
		
		if (!file_exists('ac_chats\\'.$name.'.txt')){
		$make_ac = fopen('ac_chats\\'.$name.'.txt','w');
		fwrite($make_ac , 'everyone');
	    fclose($make_ac);
	}
	if($pass === $password){
echo 'true';
}else{
echo 'false';
unset($_POST);
//$test = '';
make_an_acount();
}
}
}

if(isset($_POST['make_an_ac'])){
	make_an_acount();
}

//if you are not arady making an acount
if(!isset($_POST['make_an_ac'])){
//see the name of the user and password
$name = $_POST['name'] ?? 'no-name';
$password = $_POST['password'] ?? 'no-password';
//if thay exists countenu else refrish
if($name !== 'no-name' && $password !== 'no-password'){
//the dir of the user
$sec = __DIR__.'/ac//'.$name.'.txt';
//if it exists
if(file_exists($sec)){
$name_pas = file_get_contents($sec);
$pass_name = explode(':',$name_pas);
//else it false
}else{
	echo '__sec__faild';
	$pass_name = 'no-data:no-data';
}
$pass = $pass_name[1];
if($pass === $password && $name === $pass_name[0]){
	echo '__sec__pass';
}else{
	echo '__sec__faild';
}
}else{
	echo '__sec__wait';
}
}
?>