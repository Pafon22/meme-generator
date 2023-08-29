const textInput = 'text-input';
const memeInsert = 'meme-insert';
const memeImg = 'meme-image';
const criarElemento = (elemento, pai, id) => {
  const element = document.createElement(elemento);
  if (id) {
    element.id = id;
  }
  if (pai) {
    pai.appendChild(element);
  }
  return element;
};

const estilizarInput = (inputTag) => {
  const input = inputTag;
  input.placeholder = 'Digite um título...';
  input.type = 'text';
  input.maxLength = '60';
};
const estilizarInputImgTag = (inputImgTag) => {
  const inputImg = inputImgTag;
  inputImg.accept = 'image/*';
  inputImg.type = 'file';
  inputImg.style.marginLeft = '10px';
};

const estilizarBotao = (buttonTag, cor) => {
  const button = buttonTag;
  button.style.margin = '10px 10px 10px 0';
  button.style.height = '50px';
  button.style.width = '50px';
  button.style.backgroundColor = cor;
  button.classList.add('botao-moldura');
};

const criarBotoesDaMoldura = () => {
  criarElemento('br', document.getElementById('header'), '');
  estilizarBotao(
    criarElemento('button', document.getElementById('header'), 'fire'), 'rgb(255,0,0)',
  );
  estilizarBotao(
    criarElemento('button', document.getElementById('header'), 'earth'), 'rgb(0,128,0)',
  );
  estilizarBotao(
    criarElemento('button', document.getElementById('header'), 'water'), 'rgb(0, 0, 255)',
  );
};

const criarHeader = () => {
  const headerTag = criarElemento('header', document.body, 'header');
  criarElemento('p', headerTag).innerText = 'Título do Meme:';
  estilizarInput(criarElemento('input', headerTag, textInput));
  estilizarInputImgTag(criarElemento('input', headerTag, memeInsert));
  criarBotoesDaMoldura();
};

const estilizarImgTag = (imgTag) => {
  const img = imgTag;
  img.alt = 'Insira uma imagem';
  img.style.top = '0';
  img.style.left = '0';
  img.style.width = '100%';
  img.style.height = '100%';
  img.src = '#';
  img.style.position = 'absolute';
  img.style.zIndex = '-1';
};

const estilizarH1 = (h1Tag) => {
  const h1 = h1Tag;
  h1.style.textShadow = '5px 5px 5px black';
  h1.style.fontSize = '30px';
  h1.style.color = 'white';
};

const estilizarContainer = (containerTag) => {
  const container = containerTag;
  container.style.border = '1px solid black';
  container.style.backgroundColor = 'white';
  container.style.position = 'relative';
  container.style.margin = '30px 0px';
  container.style.position = 'absolute';
  container.style.width = '300px';
  container.style.height = '300px';
  container.style.zIndex = '0';
};

const criarMain = () => {
  const mainTag = criarElemento('main', document.body, 'main');
  const containerTag = criarElemento('container', mainTag, 'meme-image-container');
  estilizarContainer(containerTag);
  estilizarH1(criarElemento('h1', containerTag, 'meme-text'));
  estilizarImgTag(criarElemento('img', containerTag, memeImg));
};

const digitarTitulo = (event) => {
  const h1Tag = document.getElementById('meme-text');
  h1Tag.innerText = event.target.value;
  h1Tag.style.margin = '0';
};

const uploadImage = (event) => {
  const { target } = event;
  const [file] = target.files;
  const imageTag = document.getElementById(memeImg);
  if (file) {
    imageTag.src = URL.createObjectURL(file);
  }
};

const modificarMoldura = (event) => {
  const botaoMoldura = event.target;
  const containerTag = document.getElementById('meme-image-container');
  let border = '1px solid black';
  switch (botaoMoldura.id) {
  case 'fire':
    border = '3px dashed rgb(255, 0, 0)';
    break;
  case 'earth':
    border = '6px groove rgb(0, 128, 0)';
    break;
  case 'water':
    border = '5px double rgb(0, 0, 255)';
    break;
  default:
    break;
  }
  containerTag.style.border = border;
};

const criarImagensPredefinidas = (footerTag, n) => {
  const footer = footerTag;
  const imgTag = criarElemento('img', footer, `meme-${n}`);
  imgTag.classList.add('img-predefinida');
  imgTag.src = `imgs/meme${n}.png`;
  imgTag.style.width = '20%';
  imgTag.style.height = '100px';
  imgTag.style.marginLeft = '10px';
  imgTag.style.border = '2px groove black';
};

const criarFooter = () => {
  const footerTag = criarElemento('footer', document.body, 'footer');
  footerTag.style.bottom = '0px';
  footerTag.style.position = 'absolute';
  for (let index = 0; index < 4; index += 1) {
    criarImagensPredefinidas(footerTag, (index + 1));
  }
};

const modificarContainer = (event) => {
  const imgPredefinida = event.target;
  const imageTag = document.getElementById(memeImg);
  imageTag.src = imgPredefinida.src;
};

const paginaCarregada = () => {
  criarHeader();
  criarMain();
  criarFooter();
  const inputTag = document.getElementById(textInput);
  const inputImgTag = document.getElementById(memeInsert);
  const botoesMoldura = document.getElementsByClassName('botao-moldura');
  const botoesImgPredefinidas = document.getElementsByClassName('img-predefinida');
  console.log(botoesImgPredefinidas[0]);
  inputTag.addEventListener('input', digitarTitulo);
  inputImgTag.addEventListener('change', uploadImage);
  for (let index = 0; index < botoesMoldura.length; index += 1) {
    botoesMoldura[index].addEventListener('click', modificarMoldura);
  }
  for (let index = 0; index < botoesImgPredefinidas.length; index += 1) {
    botoesImgPredefinidas[index].addEventListener('click', modificarContainer);
  }
};

window.addEventListener('load', paginaCarregada);
