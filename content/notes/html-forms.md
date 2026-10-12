---
title: HTML Forms
topic: HTML
tags: [html, forms, inputs]
date: 2026-10-12
---

# HTML Forms

Forms collect information from users, such as names, emails, preferences, or messages. They are the main way users send data to a server or a front-end app. A well-structured form is easier to understand and use for both people and browsers.

## Common form elements

- `<form>`: wraps the entire form.
- `<label>`: describes what the input is for.
- `<input>`: collects data with different types.
- `<textarea>`: allows longer text input.
- `<select>` and `<option>`: choose from a list.
- `<button>`: submits or triggers action.

```html
<form>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" placeholder="you@example.com" required />

  <label for="topic">Topic</label>
  <select id="topic" name="topic">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
  </select>

  <label for="message">Message</label>
  <textarea id="message" name="message" rows="4" placeholder="Write your message..."></textarea>

  <button type="submit">Send</button>
</form>
```

Labels connect to controls by using the `for` attribute and matching `id` value. This improves accessibility because screen readers announce the field clearly. Attributes like `required`, `placeholder`, and `value` help guide users and set defaults.

## Common mistakes

- Forgetting to connect a label to its input, which makes forms harder to use.
- Using generic placeholder text instead of clear instructions.
- Setting `type="text"` when a more specific input type, like `email` or `number`, would be better.

## Quick recap

- Use `<label>` and matching `id` values for accessibility.
- Choose the right input type for the data being collected.
- Use `required`, `placeholder`, and `value` to guide users.
- Keep forms simple and easy to scan.
