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
      name: here.find('h2.item-title').text(),
      price: here.find('p.item-price').text().replace(/\$/, ''),
    }

    order = addToOrder(item, order);
    updateTotals(order);
  })

  $('.remove-from-order').on('click', function (evt) {
    evt.preventDefault();

    var here = $(this).closest('.menu-item');
    var item = {
      id: here.find('input').data('item'),
      name: here.find('p.item-title').text(),
      price: here.find('p.item-price').text().replace(/\$/, ''),
    }

    order = removeFromOrder(item, order);
    updateTotals(order);

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


//click on a plus button
function addToOrder(item, order) {

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

  return order;

}



//click on a minus button
function removeFromOrder(item, order) {

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
  return order;

}

function addAddHandlerToDropdown() {
    $('.formattedItem > .add-to-order').on('click', function() {
    let currentItemName = $(this).siblings('.name').text();
    let currentIndex;
    for (index in order.items) {
      if (order.items[index].name === currentItemName) {
        currentIndex = index;
      }
    }
    let item = {
      id: order.items[currentIndex].id,
      name: order.items[currentIndex].name,
      price: order.items[currentIndex].price,
    }

    order = addToOrder(item, order);
    updateTotals(order);
  })

}

function addSubtractHandlerToDropdown() {
  $('.formattedItem > .remove-from-order').on('click', function() {
    let currentItemName = $(this).siblings('.name').text();
    let currentIndex;
    for (index in order.items) {
      if (order.items[index].name === currentItemName) {
        currentIndex = index;
      }
    }
    let item = {
      id: order.items[currentIndex].id,
      name: order.items[currentIndex].name,
      price: order.items[currentIndex].price,
    }

    order = removeFromOrder(item, order);
    updateTotals(order);
  })

}


function updateTotals(order) {
  $('#order-total').text(`$${order.total} + tax`)
    console.log('Current order: ',order);

    reviewOrderPane(order);
}


function reviewOrderPane(order) {
  $('#dropdown-items-container').empty();
  order.items.forEach(item => {
    let listItem = createItemInPane(item);
    $('#dropdown-items-container').append(listItem)

  })

  addSubtractHandlerToDropdown();
  addAddHandlerToDropdown();

}


function createItemInPane(item) {
  let formattedItem =
  `<div class='formattedItem'>
    <span class='pane-item name'>${item.name}</span>
    <span class='pane-item qty'> x ${item.quantity}:</span>
    <span class='pane-item price'><br>$${item.price*item.quantity}</span>
    <button class="add-to-order button-dropdown" type="submit">+</button>
    <button class="remove-from-order button-dropdown" type="submit">-</button>
  </div><br>`

  return formattedItem;
}




