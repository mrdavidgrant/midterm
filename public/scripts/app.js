var order = {
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

    let current = order.items.filter(function (ordered) {
      return ordered.id === item.id
    })
    if (current.length !== 0) {
      current[0].quantity++;
      order.total += (item.price *1);
    } else {
      item.quantity = 1;
      order.items.push(item);
      order.total += (item.price *1);
    }

    updateTotals(order);
  })


  $('.menu-item > .remove-from-order').on('click', function (evt) {
    evt.preventDefault();
    var here = $(this).closest('.menu-item');
    var item = {
      id: here.find('input').data('item'),
      name: here.find('p.item-title').text(),
      price: here.find('p.item-price').text().replace(/\$/, ''),
    }

    let current = order.items.filter(function (ordered) {
      return ordered.id === item.id
    })
    if (current.length !== 0) {
      current[0].quantity--;
      order.total -= (item.price *1);
      //at this point, if quantity is 0, remove item from array
      if (current[0].quantity === 0) {
        for (index in order.items) {
          if (order.items[index].quantity === 0) {
            order.items.splice(index, 1);
          }
        }
      }

      }
      updateTotals(order);

  })

  $('#order-submit').on('click', function(evt) {
    evt.preventDefault();

    order['firstName'] = $('#user-first').val();
    order['lastName'] = $('#user-last').val();
    order['phone'] = $('#user-phone').val();
    order['email'] = $('#user-email').val();


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

function updateTotals(order) {
  $('#order-total').text(`$${order.total} + tax`)
    console.log('Current order: ',order);

    reviewOrderPane(order);
}



