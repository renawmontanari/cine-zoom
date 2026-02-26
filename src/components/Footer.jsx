import "./Footer.css";

const Footer = () => {
  return (
    <footer className="container-footer">
      <p>Desenvolvido por <strong>Renan</strong> · {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
