var order = {
  user: {},
  items: [],
  total: 0
};

function isSame (element) {
  return element.name === item.name
}

$(document).ready(function() {
  $('.menu-item').on('click', 'input', function (evt) {
    evt.preventDefault();
    var here = $(this).closest('.menu-item');
    var item = {
      id: here.find('input').data('item'),
      name: here.find('p.item-title').text(),
      price: here.find('p.item-price').text().replace(/\$/, ''),
    }
    if (order.items.filter(function (ordered) {
      return ordered.id === item.id
    }).length !== 0) {
      order.items.filter(function (ordered) {
        return ordered.id === item.id
      })[0].quantity++;
      order.total += (item.price *1);
    } else {
      item.quantity = 1;
      order.items.push(item);
      order.total += (item.price *1);
    }
    $('#order-total').text(`$${order.total} + tax`)
    console.log('Current order: ',order);


    reviewOrderPane(order);
  })

  $('#order-submit').on('click', function(evt) {
    evt.preventDefault();

    order.user.first_name = $('#user-first').val();
    order.user.last_name = $('#user-last').val();
    order.user.phone = $('#user-phone').val();
    order.user.email = $('#user-email').val();


    console.log('submitting...')
    $.ajax({
      url: '/order',
      method: 'POST',
      data: order,
      success: function () {
        console.log('success')
      }
    })

  })

});






function reviewOrderPane(order) {
  $('#dropdown-items-container').empty();
  order.items.forEach(item => {
    let listItem = createItemInPane(item);
    $('#dropdown-items-container').append(listItem)
  })
}


function createItemInPane(item) {
  let formattedItem =
  `<h6 class='pane-item-name'>${item.name}</h6>
  <h6 class='pane-item-qty'>x ${item.quantity}:</h6>
  <h6 class='pane-item-price'>$${item.price*item.quantity}</h6>`

  return formattedItem;
}





