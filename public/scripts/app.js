var order = {
  items: []
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
      price: here.find('p.item-price').text(),
    }
    if (order.items.filter(function (ordered) {
      return ordered.id === item.id
    }).length !== 0) {
      order.items.filter(function (ordered) {
        return ordered.id === item.id
      })[0].quantity++
    } else {
      item.quantity = 1;
      order.items.push(item)
    }

    console.log('Current order: ',order)
  })
});