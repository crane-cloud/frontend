import styled from "styled-components";
import { Link } from "react-router-dom";
import { Text } from "@mantine/core";

export const LinkWithText = styled(Link)`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  color: inherit;
  gap: 5px;
  font-size: inherit;
  .text-link-icon {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  &:hover .text-link-icon {
    opacity: 1;
  }
  &:hover a {
    text-decoration: underline !important;
    color: inherit !important;
  }
`;

export const NoWrapText = styled(Text)`
  white-space: nowrap;
  font-size: inherit;
`;
