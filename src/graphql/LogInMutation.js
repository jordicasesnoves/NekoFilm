import { gql } from "apollo-boost";

export const LogInMutation = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
