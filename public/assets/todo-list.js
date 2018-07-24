$(document).ready(function(){
  console.log("Connected.");
  //$('#addTask').click(function(){alert("You added a new task!")});

  // $('form').on('submit',function(){
  //   console.log('u submitted');
  //   let title = $('#poemTitle');
  //   let body = $('#poemBody');
  //   let poem = {title: title.val(), body: body.val();};
  //
  //
  //   //console.log('You have clicked an item.');
  //
  //   //console.log(item);
  //   $.ajax({
  //     type: 'POST',
  //     url: '/feed',
  //     data: poem,
  //
  //     success: function(data){
  // //some code to do something with the response
  //       location.reload();
  //     }
  //   });
  // });



$('li').on('click',function(){
  //console.log('You have clicked an item.');
  let id = $(this).attr('id');
  //console.log(item);
  $.ajax({
    type: 'DELETE',
    url: '/feed/' + id,
    success: function(data){
      location.reload();
    }
  });
});
});
