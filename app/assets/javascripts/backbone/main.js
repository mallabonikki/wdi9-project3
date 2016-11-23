// Create Collection of Tasks
var taskCollection = new TaskCollection();

var taskListView = new TaskListView({
  collection: taskCollection
});

$().ready(function() {

  $('#new-task').click(function() {

    // Render new task form, append to hidden-div
    var view = new NewTaskView();
    $('.hidden-div').html(view.render().el);
    $('.datepicker').pickadate({
      selectMonths: true,
      selectYears: 15
    });
    // Reveal hidden-div
    $('.hidden-div').fadeIn("slow");
  });

  $('#search-task').val("Search");
  
  $('#search-task').focus(function() {
    $(this).val("");
  });

  $('#search-task').focusout(function() {
      $(this).val("Search");
  });

  $('#search-task').bind('keypress', function(e) {
    if (e.keyCode == 13) {
      var searchResult = taskCollection.where({ title: $(this).val() });
      $(this).val("");
      console.log(searchResult);
      var searchResultCollection = new TaskCollection(searchResult);
      console.log(searchResultCollection);
      var view = new TaskListView({collection: searchResultCollection});
      $('.hidden-div').html(view.render().el);
      $('.hidden-div').fadeIn('slow');
      // debugger
    }
  });
  

  // Populate task collection with AJAX call
  taskCollection.fetch()
  $('.task-list').append(taskListView.el);


  //search test
  $('#search-task').keypress(function(event) {
    // debugger
      var keycode = (event.keycode ? event.keyCode : event.which);
      if (keycode == '13') {
        query = $(this).val();
        console.log("query = " + query);
        console.log("task collection = " + taskCollection);
        // $(this).val("");
        
      }

    // when enter is pressed, get the value of the input, and filter the taskCollection.

    // render the filtered task collection

  })

  $('#search-task').focusout(function() {
    $(this).val("Search Task");
  });
 
  $('#search-task').mousedown(function() {
      $(this).val("");
  })

});
