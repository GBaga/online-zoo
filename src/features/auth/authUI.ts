import { ApiError } from "../../api/apiClient";
import { AuthService } from "./authService";

function validateEmail(email: string): boolean {
  const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(email.trim());
}

function validateName(name: string): boolean {
  const re = /^[A-Za-z ]{3,}$/;
  return re.test(name.trim());
}

function validateLogin(login: string): boolean {
  // At least 3 chars, start with letter, only English letters
  const re = /^[A-Za-z][A-Za-z]{2,}$/;
  return re.test(login.trim());
}

function validatePassword(password: string): boolean {
  // At least 6 chars, at least 1 special char
  const re = /^(?=.*[!@#$%^&*()_\-+=<>?{}~[\]]).{6,}$/;
  return re.test(password);
}

function applyValidationState(
  input: HTMLInputElement,
  errorMsg: HTMLElement,
  isValid: boolean,
  message: string,
) {
  if (isValid) {
    input.classList.remove("invalid");
    errorMsg.classList.remove("visible");
    errorMsg.textContent = "";
  } else {
    input.classList.add("invalid");
    errorMsg.classList.add("visible");
    errorMsg.textContent = message;
  }
}

function setupInputValidation(
  input: HTMLInputElement,
  errorMsg: HTMLElement,
  validator: (val: string) => boolean,
  errorMessage: string,
  onStateChange: () => void,
): () => boolean {
  const evaluate = () => {
    const valid = validator(input.value);
    applyValidationState(input, errorMsg, valid, errorMessage);
    return valid;
  };

  input.addEventListener("blur", () => {
    evaluate();
    onStateChange();
  });

  input.addEventListener("focus", () => {
    input.classList.remove("invalid");
    errorMsg.classList.remove("visible");
  });

  input.addEventListener("input", () => onStateChange());

  return evaluate;
}

export function initAuthUI() {
  const loginForm = document.getElementById(
    "loginForm",
  ) as HTMLFormElement | null;
  const registerForm = document.getElementById(
    "registerForm",
  ) as HTMLFormElement | null;

  if (loginForm) {
    const loginInput = document.getElementById(
      "loginInput",
    ) as HTMLInputElement;
    const loginError = document.getElementById("loginError") as HTMLElement;
    const pwdInput = document.getElementById(
      "passwordInput",
    ) as HTMLInputElement;
    const pwdError = document.getElementById("passwordError") as HTMLElement;
    const submitBtn = document.getElementById(
      "loginSubmitBtn",
    ) as HTMLButtonElement;
    const serverError = document.getElementById(
      "loginServerError",
    ) as HTMLElement;

    const checkFormValid = () => {
      const isLoginValid = validateLogin(loginInput.value);
      const isPwdValid = validatePassword(pwdInput.value);
      submitBtn.disabled = !(isLoginValid && isPwdValid);
    };

    const runLoginVal = setupInputValidation(
      loginInput,
      loginError,
      validateLogin,
      "Invalid login format (min 3 letters, English only)",
      checkFormValid,
    );
    const runPwdVal = setupInputValidation(
      pwdInput,
      pwdError,
      validatePassword,
      "Password needs min 6 chars and 1 special character",
      checkFormValid,
    );

    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!runLoginVal() || !runPwdVal()) return;

      submitBtn.disabled = true;
      submitBtn.textContent = "Signing in...";
      serverError.textContent = "";

      try {
        await AuthService.login({
          login: loginInput.value,
          password: pwdInput.value,
        });
        // Success -> redirect to Menu page or index
        window.location.href = "/pages/landing/index.html";
      } catch (err: unknown) {
        if (err instanceof ApiError) {
          if (err.status === 401) {
            serverError.textContent = "Incorrect login or password";
          } else {
            serverError.textContent = `Server Error: ${err.message}`;
          }
        } else {
          serverError.textContent = "An unexpected error occurred.";
        }
        submitBtn.disabled = false;
        submitBtn.textContent = "Sign In";
      }
    });
  }

  if (registerForm) {
    const nameInput = document.getElementById(
      "regNameInput",
    ) as HTMLInputElement;
    const nameError = document.getElementById("regNameError") as HTMLElement;
    const emailInput = document.getElementById(
      "regEmailInput",
    ) as HTMLInputElement;
    const emailError = document.getElementById("regEmailError") as HTMLElement;
    const loginInput = document.getElementById(
      "regLoginInput",
    ) as HTMLInputElement;
    const loginError = document.getElementById("regLoginError") as HTMLElement;
    const pwdInput = document.getElementById(
      "regPasswordInput",
    ) as HTMLInputElement;
    const pwdError = document.getElementById("regPasswordError") as HTMLElement;
    const cpwdInput = document.getElementById(
      "regConfirmPasswordInput",
    ) as HTMLInputElement;
    const cpwdError = document.getElementById(
      "regConfirmPasswordError",
    ) as HTMLElement;
    const submitBtn = document.getElementById(
      "registerSubmitBtn",
    ) as HTMLButtonElement;
    const serverError = document.getElementById(
      "registerServerError",
    ) as HTMLElement;

    const checkFormValid = () => {
      submitBtn.disabled = !(
        validateName(nameInput.value) &&
        validateEmail(emailInput.value) &&
        validateLogin(loginInput.value) &&
        validatePassword(pwdInput.value) &&
        cpwdInput.value === pwdInput.value
      );
    };

    setupInputValidation(
      nameInput,
      nameError,
      validateName,
      "Name must contain only English letters (min 3)",
      checkFormValid,
    );
    setupInputValidation(
      emailInput,
      emailError,
      validateEmail,
      "Invalid email format",
      checkFormValid,
    );
    setupInputValidation(
      loginInput,
      loginError,
      validateLogin,
      "Invalid login format (min 3 letters, English only)",
      checkFormValid,
    );
    setupInputValidation(
      pwdInput,
      pwdError,
      validatePassword,
      "Password needs min 6 chars and 1 special character",
      checkFormValid,
    );
    setupInputValidation(
      cpwdInput,
      cpwdError,
      (v) => v === pwdInput.value && v.length > 0,
      "Passwords do not match",
      checkFormValid,
    );

    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.textContent = "Registering...";
      serverError.textContent = "";

      try {
        await AuthService.register({
          name: nameInput.value,
          email: emailInput.value,
          login: loginInput.value,
          password: pwdInput.value,
        });
        // Auto-login or redirect to login
        window.location.href = "/pages/login/index.html";
      } catch (err: unknown) {
        if (err instanceof ApiError) {
          if (err.status === 409) {
            serverError.textContent = "User already exists";
          } else if (err.status === 400) {
            serverError.textContent = "Validation error from server";
          } else {
            serverError.textContent = `Server Error: ${err.message}`;
          }
        } else {
          serverError.textContent = "An unexpected error occurred.";
        }
        submitBtn.disabled = false;
        submitBtn.textContent = "Register";
      }
    });
  }
}
