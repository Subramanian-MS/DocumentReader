$( document ).ready(function() {
	var inputs = document.querySelectorAll( '.fileinput' );
	//console.log(inputs);
	Array.prototype.forEach.call( inputs, function( input )
	{
		
		//var label	 = input.nextElementSibling,
			//labelVal = label.innerHTML;
			
		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			console.log(this.files)
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName ){
				//label.querySelector( 'span' ).innerHTML = fileName;

				let reader = new FileReader();
				reader.onload = function () {
					let dataURL = reader.result;
					$("#selected-image").attr("src", dataURL);
					$("#selected-image").addClass("col-12");
				}
				let file = this.files[0];
				console.log(file)
				reader.readAsDataURL(file);
				startRecognize(file);
			}
			else{
				label.innerHTML = labelVal;
				$("#selected-image").attr("src", '');
				$("#selected-image").removeClass("col-12");
				$("#arrow-right").addClass("fa-arrow-right");
				$("#arrow-right").removeClass("fa-check");
				$("#arrow-right").removeClass("fa-spinner fa-spin");
				$("#arrow-down").addClass("fa-arrow-down");
				$("#arrow-down").removeClass("fa-check");
				$("#arrow-down").removeClass("fa-spinner fa-spin");
				$("#log").empty();
			}
		});

		// Firefox bug fix
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});
});

$("#startLink").click(function () {
	var img = document.getElementById('selected-image');
	startRecognize(img);
});

function startRecognize(img){
	$("#arrow-right").removeClass("fa-arrow-right");
	$("#arrow-right").addClass("fa-spinner fa-spin");
	$("#arrow-down").removeClass("fa-arrow-down");
	$("#arrow-down").addClass("fa-spinner fa-spin");
	recognizeFile(img);
}

function progressUpdate(packet){
	var log = document.getElementById('log');

	if(log.firstChild && log.firstChild.status === packet.status){
		if('progress' in packet){
			var progress = log.firstChild.querySelector('progress')
			progress.value = packet.progress
		}
	}else{
		var line = document.createElement('div');
		line.status = packet.status;
		var status = document.createElement('div')
		status.className = 'status'
		status.appendChild(document.createTextNode(packet.status))
		line.appendChild(status)

		if('progress' in packet){
			var progress = document.createElement('progress')
			progress.value = packet.progress
			progress.max = 1
			line.appendChild(progress)
		}


		if(packet.status == 'done'){
			log.innerHTML = ''
			var pre = document.createElement('pre')
			pre.appendChild(document.createTextNode(packet.data.text.replace(/\n\s*\n/g, '\n')))
			line.innerHTML = ''
			//line.appendChild(pre)
			var sel = document.getElementById('typeofdoc');
var selectedValue = sel.options[sel.selectedIndex].value;

			var check = packet.data.text.replace(/\n\s*\n/g, '\n');
			if(selectedValue=='Aadhar')
			{
			var regexAadhar =new RegExp('[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}|[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}','g');
			var regexDOB= new RegExp('DOB\\s:\\s[0-9]{2}/[0-9]{2}/[0-9]{4}','g');
			var regexGender = new RegExp('MALE|FEMALE|Male|Female','g')	;
				var AadharNumber = check.match(regexAadhar);
			    var DOB = check.match(regexDOB);
				var DOB1;
			if(AadharNumber==null)
			{
				AadharNumber="Couldn't Recognise Aadhar Number"
			}
			else{AadharNumber=check.match(regexAadhar);}
			if(DOB==null)
			{
                DOB1="Couldn't Recognise DOB"
			}
			else
			{
				DOB1 = DOB[0].replace("DOB :","");
			}
			
			    var Gender = check.match(regexGender);
				if(Gender==null)
				{
					Gender="Couldn't Recognise Gender"
				}
				else
                {
					Gender = check.match(regexGender);
                }
				line.innerHTML='<div> Aadhar Number :'+ AadharNumber[0]+ '<br> Date of Birth :'+DOB1+'<br> Gender :'+Gender+ '</div>'
			}
			else if(selectedValue=='Passport')
			{
				var regexPass =new RegExp('[A-Z]{1}[1-9][0-9]{5}[1-9]','g');
			    var regexName= new RegExp('<IND[A-Za-z]+<[A-Za-z]+<<[A-Za-z]+|<IND[A-Za-z]+K[A-Za-z]+K<[A-Za-z]+','g');
				var regexDOB= new RegExp('<0IND[0-9]{6}','g');
				var PassNumber = check.match(regexPass);
				if(PassNumber==null){PassNumber="Couldn't Recognise Passport Number"}
				else{PassNumber = check.match(regexPass);}
				var Name=check.match(regexName);
				var Name2;
				if(Name==null){Name2="Couldn't Recognise Name"}
				else{var Name1 = Name[0].replace("<IND","");
				 Name2=Name1.replace(/<|<<|K|K</gi," ")}
			  
				var DOB = check.match(regexDOB);
				
				var DOB2;
				if(DOB==null){DOB2="Couldn't Recognise Date of Birth"}
				else
				{
					var DOB1 = DOB[0].replace("<0IND","");
					DOB2 = DOB1[4]+DOB1[5]+"/"+DOB1[2]+DOB1[3]+"/"+DOB1[0]+DOB1[1];
				}
			
				line.innerHTML='<div> Passport Number :'+PassNumber[0]+'<br> Name: '+Name2	+'<br> Date Of Birth:'+DOB2+'</div>'
			}
			else if(selectedValue=='PanCard')
			{
				var regexPan =new RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}','g');
			    var regexName= new RegExp('NAME\n[A-Za-z]+\\s[A-Za-z]+\\s[A-Za-z]+','g');
				var regexDOB= new RegExp('[0-9]{2}-[0-9]{2}-[0-9]{4}','g')
				var PanNumber = check.match(regexPan);
				if(PanNumber==null)
				{PanNumber="Couldn't Recognise Pan Number"}
				else{PanNumber = check.match(regexPan);}
			    var Name = check.match(regexName);
				var DOB = check.match(regexDOB);
				if(DOB==null){DOB="Couldn't Recognise DOB"}
				else{DOB = check.match(regexDOB);}
				var Name1;
				if(Name==null){Name1="Couldn't Recognise Name"}
				else{ Name1= Name[0].replace("NAME","");}
				line.innerHTML='<div> Pan Number : '+ PanNumber[0]+'<br> Name : '+Name1+'<br> Date of Birth : '+DOB+ '</div>'
			}
			else if(selectedValue=='DrivingLicense')
			{
				var regexDL =new RegExp('[A-Z]{2}[0-9]{2}\\s[0-9]{11}','g');
			    var regexName= new RegExp('Name\\s:\\s[A-Za-z]+\\s[A-Z]+\\s','g');
				var regexDOB= new RegExp('Date\\sOf\\sBirth\\s:\\s[0-9]{2}-[0-9]{2}-[0-9]{4}','g')
			    var regexBlood= new RegExp('Blood\\sGroup\\s[A-Za-z]+[+|-]','g')

				var DLNumber = check.match(regexDL);
				if(DLNumber==null){DLNumber="Couldn't Recognise DL Number"}
				else{DLNumber = check.match(regexDL);}
			
                var Name= check.match(regexName);
				if(Name==null){
					Name="Couldn't Recognise Name"
				}
				else{Name= check.match(regexName);}
				var DOB = check.match(regexDOB);
				if(DOB==null){DOB="Couldn't Recognise DOB"}
				else{DOB = check.match(regexDOB);}
				var Blood = check.match(regexBlood);
				var BloodGroup ;
				if(Blood==null)
				{
					BloodGroup="Couldn't Recognise Blood Group"
				}
				else
				{
				 BloodGroup = Blood[0].replace("Blood Group","");
				}
			
				line.innerHTML='<div> Driving License Number :'+DLNumber[0]+'<br>'+Name[0]+'<br>'+DOB+'<br>'+'Blood Group:'+BloodGroup+'</div>'
			}
			else
			{
				line.innerHTML='<div> Select correct Option :'+'</div>'
			}
			$(".fas").removeClass('fa-spinner fa-spin')
			$(".fas").addClass('fa-check')
		}

		log.insertBefore(line, log.firstChild)
	}
}

function recognizeFile(file){
	$("#log").empty();
  	const corePath = window.navigator.userAgent.indexOf("Edge") > -1
    ? 'js/tesseract-core.asm.js'
    : 'js/tesseract-core.wasm.js';


	const worker = new Tesseract.TesseractWorker({
		corePath,
	});

	worker.recognize(file,
		'eng'
	)
		.progress(function(packet){
			console.info(packet)
			progressUpdate(packet)

		})
		.then(function(data){
			console.log(data)
			progressUpdate({ status: 'done', data: data })
		})
}
//selecting all required elements

const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions

button.onclick = ()=>{
  input.click(); //if user click on the button then the input also clicked
  
}


input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");

  showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
 

  showFile(); //calling function
});

function showFile(){
  let fileType = file.type; //getting selected file type
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
  if(validExtensions.includes(fileType)){ //if user selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = ()=>{
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      let imgTag = `<img src="${fileURL}" alt="">`; //creating an img tag and passing user selected file source inside src attribute

      dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
      
    }
    fileReader.readAsDataURL(file);
    
  }
  else{
    alert("Please upload only Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}
