function createMenuElement(item) {
  let name = item.name;
  let price = item.price;
  let description = item.description;
  let image = item.image;


  let itemHTML =
    `<div class='menu-item large-4 medium-6 small-12 columns'>
        <img class='item-photo' src='${image}' height='75px' width='100px'>
        <p class='item-title'>${name}</p>
        <p class='item-price'>$${price}</p>
        <p class='item-description'>${description}</p>
      </div>`

  return itemHTML;
}


module.exports = {createMenuElement: createMenuElement}


