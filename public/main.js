var cancelOrder = document.getElementsByClassName("fa-times-circle");
var completedBy = document.getElementsByClassName("reassign");

Array.from(cancelOrder).forEach(function(element) {
  element.addEventListener('click', function() {
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const order = this.parentNode.parentNode.childNodes[7].innerText

    fetch('cancelOrder', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'order': order,
        'customer': name,
        'assign': "Team",
        'completed': 'no'
      })
    }).then(function(response) {
      window.location.reload()
    })
  });
});

Array.from(completedBy).forEach(function(element) {
  element.addEventListener('click', function() {
    const name = this.parentNode.childNodes[1].innerText
    const order = this.parentNode.childNodes[7].innerText
    const baristaName = this.childNodes[1].innerText

    var msg = new SpeechSynthesisUtterance(name + 'come get yo shit!');
    window.speechSynthesis.speak(msg);

    fetch('completed', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'order': order,
          'customer': name,
          'assign': baristaName,
          'completed': "yes"
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth();
var yyyy = today.getFullYear();
var monthName
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
today = monthNames[mm] + ' ' + dd + ', ' + yyyy;
document.querySelector('.date').innerHTML = today
