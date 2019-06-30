class Verification {
  constructor() {
    const forms = [...document.querySelectorAll("form")];
    forms.forEach( form => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.verifyForm(form);
      });
    } );
  }

  verifyForm(form) {
    const inputs = [...form.querySelectorAll(".verification")];
    inputs.forEach(input => {
      const error = this.verifyInput(input);
      if (error) {
        input.parentElement.dataset.error = error;
      } else {
        delete input.parentElement.dataset.error;
      }
    })
  }

  verifyInput(input) {
    const list = input.classList;
    if (list.contains("verification-required") && !this.verifyRequired(input)) {
      return "This field is required";
    }

    if (list.contains("verification-email") && !this.verifyInputEmail(input))  {
      return "Incorrect email"
    }

    if (list.contains("verification-phone") && !this.verifyInputPhone(input)) {
      return "Incorrect phone number";
    }

    return null;
  }

  verifyRequired(input) {
    return !!input.value;
  }

  verifyInputPhone(input) {
    const re = /\+7\(\d{3}\)\d{3}-\d{4}/gm;
    return re.test(input.value);
  }

  verifyInputEmail(input) {
    const re = /\w+[\.-]*\w+@\w+\.\w{2,4}/gm;
    return re.test(input.value);
  }
}

new Verification();
