var myTasks = (function() {

var taskList = [];
var editable;

$('#add-btn').click(addTask);
$('#delete-btn').click(deleteTask);
$('#sort-btn').click(sortTask);
$('#edit-btn').click(editTask);
$('#save-btn').click(saveTask);
$('#cancel-btn').click(cancelTask);

$('#save-btn').hide();
$('#cancel-btn').hide();


$('#my-form').attr('action', 'javascript:void(0);');

$("#name").keyup(function(event){
    if(event.keyCode == 13){
        $("#add-btn").click();
    }
});
	
	function cleaner() {
		
		$('#my-form').trigger('reset');
		$('#name').focus();
		
	}

	
	function addTask() {

		var name = $('#name').val().trim().toLowerCase();

		if(name.length > 0) {

			if(duplicated(name) === true) {

				alert('The task already exists');
				cleaner();

			} else {

				taskList.push(name);

				var list = document.createElement('li');
				var input = document.createElement('input');
				var label = document.createElement('input');

				list.className = "li";
				
				label.className = 'new-text';
				label.setAttribute('name', name.charAt(0).toUpperCase() + name.substring(1).toLowerCase());
				label.setAttribute('value', name.charAt(0).toUpperCase() + name.substring(1).toLowerCase());
				label.setAttribute('readonly', true);

				input.type = 'checkbox';
				input.className = 'box';
				input.addEventListener('click', onCheck);

								
				$('#tasks').append(list);
				list.append(input);
				list.append(label);
				
				cleaner();
			}
		
		} else {

			alert('Add the task name');
			cleaner();
		}

	}


	function duplicated(name) {

		for (var i = 0; i < taskList.length; i++) {
			if (taskList[i] == name) {
				return true;
			} 
		}
	}

	

	function onCheck(event) {

		var checking = event.target;
		
		if(checking.checked) {

			checking.setAttribute('checked', 'checked');
		
		} else {

			checking.removeAttribute('checked');
		}
	}


	

	function deleteTask() {

		if($('#tasks').has('li').length) {
			
			if ($('input.box').is(':checked')) {

				if(confirm('All the selected tasks will be removed')) {
					
					$('input.box:checked').parent().remove();
					cleaner();
				}
				
			} else {

				if(confirm('All the tasks will be removed')) {
					
					$('#tasks').empty();
					cleaner();
				}

			}
				
			var string = $( ".new-text" ).map(function() { return(this.name); }).get().join().toLowerCase();

			var array = string.split(',');

			taskList = array;

		} else {

			alert('You must have at least one task for removal');
		}

	}



	document.getElementById('tasks').addEventListener('change', onChange, false);

	function numberOfCheckboxesSelected() {
		return document.querySelectorAll('input[type=checkbox]:checked').length;
	}

	function onChange() {
		document.getElementById('edit-btn').disabled = numberOfCheckboxesSelected() > 1;
	}

	
	function editTask() {

		if ($('input.box').is(':checked')) {

			$('#edit-btn').prop('disabled', true);
			$('#add-btn').prop('disabled', true);
			$('#delete-btn').prop('disabled', true);
			$('#sort-btn').prop('disabled', true);
			$('#save-btn').show();
			$('#cancel-btn').show();
			$('input.box').prop('disabled', true);


			editable = $('input.box:checked').next();
			editable.removeAttr('readonly').focus();
			
		} else {

			alert('Please select the task you want to edit from the list');
		    cleaner();

		}

	}



	function saveTask() {
		
		var value = $('input.box:checked').next().val().toLowerCase();

		if(duplicated(value) === true) {

			alert("Sorry, the task already exists");
			cancelTask();

		} else {
			
			$('input.box:checked').next().attr('value', value);
			$('input.box:checked').next().attr('name', value);
		}

		
		var string = $( ".new-text" ).map(function() { return(this.name); }).get().join().toLowerCase();

		var array = string.split(',');

		taskList = array;

		
		if(editable.attr('readonly')) {
			
		}  else {

			editable.attr('readonly', 'readonly');
		}

		$('input.box').prop('disabled', false);
		$('#cancel-btn').hide();
		$('#edit-btn').prop('disabled', false);
		$('#add-btn').prop('disabled', false);
		$('#delete-btn').prop('disabled', false);
		$('#sort-btn').prop('disabled', false);
		$('#save-btn').hide();

		cleaner();
	}



	function cancelTask() {

		if(editable.attr('readonly')) {
			
		}  else {

			editable.attr('readonly', 'readonly');
		}

		var string = $( ".new-text" ).map(function() { return(this.name); }).get().join().toLowerCase();

		var array = string.split(',');

		
		$('#tasks').empty();

		
		for (var i = 0; i < array.length; i++) {
					
			var list = document.createElement('li');
			var input = document.createElement('input');
			var label = document.createElement('input');

			list.className = "li";

			label.className = 'new-text';
			label.setAttribute('name', array[i].charAt(0).toUpperCase() + array[i].substring(1).toLowerCase());
			label.setAttribute('value', array[i].charAt(0).toUpperCase() + array[i].substring(1).toLowerCase());
			label.setAttribute('readonly', true);

			input.type = 'checkbox';
			input.className = 'box';
			input.addEventListener('click', onCheck);

			$('#tasks').append(list);
			list.append(input);
			list.append(label);
		
		}

		$('input.box').prop('disabled', false);
		$('#cancel-btn').hide();
		$('#edit-btn').prop('disabled', false);
		$('#add-btn').prop('disabled', false);
		$('#delete-btn').prop('disabled', false);
		$('#sort-btn').prop('disabled', false);
		$('#save-btn').hide();

		cleaner();

	}




	function sortTask() {

		var string = $( ".new-text" ).map(function() { return(this.name); }).get().join().toLowerCase();

		var array = string.split(',');

		array.sort(function(name1, name2) {
	      var nameA = name1.toUpperCase();
	      var nameB = name2.toUpperCase();
	      if (nameA < nameB) {
	        return -1;
	      }
	      if (nameA > nameB) {
	        return 1;
	      }
	      return 0;
	    });


		$('#tasks').empty();

		
		for (var i = 0; i < array.length; i++) {
			
			if (array[i] == [""]) {
				
				alert('You must add two tasks at least');
			
			} else {
					
				var list = document.createElement('li');
				var input = document.createElement('input');
				var label = document.createElement('input');

				list.className = "li";

				label.className = 'new-text';
				label.setAttribute('name', array[i].charAt(0).toUpperCase() + array[i].substring(1).toLowerCase());
				label.setAttribute('value', array[i].charAt(0).toUpperCase() + array[i].substring(1).toLowerCase());
				label.setAttribute('readonly', true);

				input.type = 'checkbox';
				input.className = 'box';
				input.addEventListener('click', onCheck);

				$('#tasks').append(list);
				list.append(input);
				list.append(label);
			}
		}

		cleaner();

	}




})();