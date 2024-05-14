const cart = []; // Массив для хранения заказов
        let totalPrice = 0; // Итоговая сумма

        // Функция для добавления в корзину
        function addToCart(name, price) {
            cart.push({ name, price });
            totalPrice += price;
            alert(`Сет "${name}" добавлен в корзину!`);
            saveCartToSessionStorage();
        }


        // Функция для отображения корзины
        function showCart() {
            const cartItems = document.getElementById('cartItems');
            cartItems.innerHTML = ''; // Очищаем список перед обновлением

            cart.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ${item.price} руб.`;
                cartItems.appendChild(li);
            });

            document.getElementById('totalPrice').textContent = totalPrice;
            document.getElementById('cartOverlay').style.display = 'block';
        }


        // Функция для очистки корзины
        function clearCart() {
            cart.length = 0;
            totalPrice = 0;
            showCart();
            saveCartToSessionStorage();
        }

        function buy() {
          alert('Ваш заказ, на сумму ' + totalPrice + ' рублей успешно оформлен!');
          clearCart();
        }

        // Загрузка корзины из сессионного хранилища
        function loadCartFromSessionStorage() {
            const savedCart = JSON.parse(sessionStorage.getItem('cart'));
            if (savedCart) {
                cart.push(...savedCart);
                totalPrice = savedCart.reduce((sum, item) => sum + item.price, 0);
            }
        }
        // Функция для закрытия корзины
        function closeCart() {
            document.getElementById('cartOverlay').style.display = 'none';
        }
        // Сохранение корзины в сессионное хранилище
        function saveCartToSessionStorage() {
            sessionStorage.setItem('cart', JSON.stringify(cart));
        }

        // При загрузке страницы
        window.addEventListener('load', loadCartFromSessionStorage);
        let mybutton = document.getElementById("scrollToTopButton");


  // При прокрутке вниз на 20px от верхней части документа, показываем кнопку
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// При нажатии на кнопку, плавно перематываем на верх
function topFunction() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}



function toggleMenu() {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('show-menu'); // Добавить или удалить класс для показа меню
}


function loadXMLFile(filename, callback) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          callback(this.responseText);
      }
  };
  xhttp.open("GET", filename, true);
  xhttp.send();
}

// Функция для парсинга XML в HTML
function parseXMLToHTML(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");

  const pElement = document.createElement("p");
  pElement.textContent = xmlDoc.documentElement.textContent;

  return pElement;
}

// Загрузка файла и отображение данных в HTML
loadXMLFile("./xml/tekst.xml", function(xmlData) {
  const pElement = parseXMLToHTML(xmlData);
  const descDiv = document.getElementById("desc");
  descDiv.appendChild(pElement);
});
