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
  })

  $('#order-submit').on('click', function(evt) {
    evt.preventDefault();
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