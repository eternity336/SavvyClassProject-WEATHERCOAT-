import html from "html-literal";

export default () => html`
  <section id="contact">
    <form action="https://formspree.io/f/mnqyppyz" method="POST">
      <header><h3>Contact Me</h3></header>
      <label for="email">Email:</label>
      <input
        name="email"
        type="email"
        id="email"
        pattern=".+@.+..+?"
        required
      />
      <label for="subject">Subject:</label>
      <input
        name="subject"
        type="text"
        id="subject"
        value="Weathercoat"
        required
      />
      <label for="message">Message:</label>
      <textarea name="message" id="message" required></textarea>
      <footer><button type="Submit">Send</button></footer>
    </form>
  </section>
`;
