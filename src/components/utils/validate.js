export const checkValidate = (email, password) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isPasswordValid = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/.test(password);
  if (!isEmailValid) return " ×   Please enter a valid Email";
  if (!isPasswordValid)
    return "  × Password should contain atleast 8 characters,including lowercase and digit ";
  return null;
};

export const checkName = (name) => {
  const isNamevalid = /^[A-Za-z\s]{2,30}$/.test(name);
  if (!isNamevalid) return " Please Enter Name";
};
