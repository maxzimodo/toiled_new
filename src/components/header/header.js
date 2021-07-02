const Header = () => {
  const header = document.getElementById('header');
  const drawerBtn = document.getElementById('drawerBtn');

  drawerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    header.classList.toggle('active')
  })
}
export default Header;