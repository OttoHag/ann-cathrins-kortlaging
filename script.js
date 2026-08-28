const filterLinks = document.querySelectorAll('.card-link');
const cards = document.querySelectorAll('.kortkort');
const detail = document.getElementById('kortdetalj');
const detailContent = document.getElementById('kortdetaljInnhold');
const backToGallery = document.getElementById('tilbakeTilGalleri');
let selectedCategory = 'alle';

const showCards = (selected) => {
  selectedCategory = selected;
  cards.forEach((card) => {
    const category = card.dataset.kategori;
    const show = selected === 'alle' || category === selected;
    card.closest('.card-link').style.display = show ? 'block' : 'none';
  });
};

filterLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    if (selectedCategory !== link.dataset.filter) {
      showCards(link.dataset.filter);
      return;
    }

    const card = link.querySelector('.kortkort');
    const image = card.querySelector('img');
    const detailImage = image ? image.cloneNode() : card.querySelector('.kortbilde').cloneNode(true);

    detailImage.classList.remove('kortbilde', 'kortbilde--liten');
    detailImage.classList.add('detaljbilde');
    if (image?.dataset.large) {
      detailImage.src = image.dataset.large;
    }

    detailContent.replaceChildren(
      detailImage,
      Object.assign(document.createElement('div'), {
        className: 'detaljtekst',
        innerHTML: `<p class="badge">${link.dataset.filter}</p>${card.querySelector('h3').outerHTML}${card.querySelector('p').outerHTML}`
      })
    );
    detail.hidden = false;
    document.getElementById('cardGrid').hidden = true;
    detail.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('.gallery-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    showCards('alle');
    detail.hidden = true;
    document.getElementById('cardGrid').hidden = false;
    document.getElementById('galleri').scrollIntoView({ behavior: 'smooth' });
  });
});

backToGallery.addEventListener('click', () => {
  detail.hidden = true;
  document.getElementById('cardGrid').hidden = false;
  document.getElementById('galleri').scrollIntoView({ behavior: 'smooth' });
});

const form = document.getElementById('bestillingsSkjema');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', (event) => {
  if (!form.checkValidity()) {
    event.preventDefault();
    formStatus.textContent = 'Fyll ut alle feltene for å sende forespørsel.';
    return;
  }

  const formData = new FormData(form);
  const navn = formData.get('navn');
  const kategori = formData.get('kategori');

  formStatus.textContent = `Takk ${navn}! Din forespørsel om ${kategori}-kort er sendt. Jeg kontakter deg snart!`;
});
