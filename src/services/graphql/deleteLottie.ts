import { gql } from '@apollo/client';

export const DELETE_LOTTIE_MUTATION = gql`
  mutation DeleteLottie($input: LottieIdInput!) {
    delete(input: $input) {
      success
    }
  }
`;
