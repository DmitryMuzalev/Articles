export class Form {
  constructor(container, controls) {
    this.container = container;
    this.controls = controls;
  }
  
  value() {
    const value = {};
    Object.keys(this.controls).forEach((control) => {
      value[control] = this.container[control].value;
    });
    return value;
  }

  isValid() {
    let isFormValid = true;
    Object.keys(this.controls).forEach((control) => {
      const validators = this.controls[control];
      let isValid = true;
      validators.forEach((validator) => {
        isValid = validator(this.container[control].value) && isValid;
      });

      isFormValid = isFormValid && isValid;
    });
    return isFormValid;
  }
}
