

function validateEmail(){
    const emailError = document.querySelector('.email-error')
    const email = document.getElementById('email').value
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid =emailPattern.test(email)
    emailError.hidden = true;
    if (!isEmailValid){
        emailError.hidden = false;
    }
}




function validatePassword(){
    const password = document.getElementById('password').value
    const errorMessage = document.querySelector('.password-error')
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isPasswordValid = passwordPattern.test(password)  

    errorMessage.hidden=true

    if(!isPasswordValid){
        errorMessage.hidden=false;
    }
}





function confirmPassword() {
    const passwordInput = document.getElementById('password');
    const passwordValue = passwordInput.value; // Get password value
  
    const confirmPasswordInput = document.getElementById('confirm-password').value;
  
    const confirmPasswordError = document.querySelector('.confirm-password-error');
  
    const passwordConfirmed = passwordValue === confirmPasswordInput;
  
    if (!passwordConfirmed) {
      confirmPasswordError.hidden = false;
    } else {
      setTimeout(() => confirmPasswordError.hidden = true, 100); // justmaining
    }
  }
  

  




