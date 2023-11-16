module.exports  = object({
    body: object({
      firstName: string().required("This firstName is required"),
      listName: string().required("The list name is required"),
      userProfile: string().required("User need profile"),
      permissionId: string().required("To connect permision for user we need id. Please set user id!"),
      password: string()
        .required("Password is required")
        .min(8, "Password is too short - should be 6 chars minimum.")
        .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
      passwordConfirmation: string().oneOf(
        [ref("password"), null],
        "Passwords must match"
      ),
      email: string()
        .email("Must be a valid email")
        .required("Email is required"),
    }),
  });
  