import { gql } from "apollo-boost";

export const SignUpMutation = gql`
  mutation SignUp($email: String!, $password: String!, $username: String!) {
    signup(email: $email, username: $username, password: $password)
  }
`;
