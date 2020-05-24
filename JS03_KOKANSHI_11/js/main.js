var firebaseConfig = {
  apiKey: "AIzaSyCv8R3L0Yr-w-wlMOplozZoScctkSXoWQA",
  authDomain: "homework-d7e90.firebaseapp.com",
  databaseURL: "https://homework-d7e90.firebaseio.com",
  projectId: "homework-d7e90",
  storageBucket: "homework-d7e90.appspot.com",
  messagingSenderId: "487936306256",
  appId: "1:487936306256:web:32a4831463b3ed1f973555"
};
firebase.initializeApp(firebaseConfig);

const newPostRef = firebase.database().ref();
let date=$('#date');
let title=$('#title');
let text=$('#text');

date.focus();

function test(){
  newPostRef.push({
    date:$('#date').val(),
    title:$('#title').val(),
    text:$('#text').val()
  })
  $('#date').val('');
  $('#title').val('');
  $('#text').val('');
}

// 送信ボタンをクリックされたら次の処理をする
$("#send").on("click", function () {
    if($('#date').val() ===""){
          alert("日付入力して下さい");
          eval("date.focus()");       
    }else if($('#title').val() ===""){
          alert("題名入力して下さい");
          eval("title.focus()");    
    }else if($('#text').val() ===""){
          alert("内容入力して下さい");
          eval("text.focus()");       
    }else{
        test();
      }
})

// 受信処理
newPostRef.on("value", function (data) {
  var v = data.val();
  let str = '';
  console.log(v)

  $.each(v,function(i,item){
   str = `${str}<li>日付${item.date}<br>題名${item.title}<br>内容${item.text}</li class="li"><button class="done" data-key=${i}>削除</button>`;
  })
  // ここでデータをhtmlに埋め込む
  $("#output").html(str);
});

//enter key送信処理
$("#text").on("keydown", function (e) {
  if(e.keyCode === 13){
      if($('#date').val() ===""){
          alert("日付入力して下さい");
          eval("date.focus()");       
      }else if($('#title').val() ===""){
          alert("題名入力して下さい");
          eval("title.focus()");    
      }else if($('#text').val() ===""){
          alert("内容入力して下さい");
          eval("text.focus()");       
      }else{
          test();
      }
  }
})

//すべて削除処理
$("#delate").on('click', function () {
  newPostRef.remove();
})
//削除処理
$("#output").on('click','.done', function () {
  var key = $(this).data('key')
  newPostRef.child(key).remove();
})

