const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.kortkort');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const selected = button.dataset.filter;

    cards.forEach((card) => {
      const category = card.dataset.kategori;
      const show = selected === 'alle' || category === selected;
      card.style.display = show ? 'block' : 'none';
    });
  });
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
