import styled from "styled-components";
import { Link } from "react-router-dom";
import { CopyButton, Flex, Text, Tooltip } from "@mantine/core";
import { TbCopy } from "react-icons/tb";

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

export const NoWrap = styled(Text)`
  white-space: nowrap;
  font-size: inherit;
`;

interface TCopyAreaButtonProps {
  value: string;
  label?: string;
  showIcon?: boolean;
}

export const CopyAreaButton = ({
  value,
  label,
  showIcon = false,
}: TCopyAreaButtonProps) => {
  return (
    <CopyButton value={value}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? "Copied" : "Copy"} withArrow>
          <Text
            onClick={copy}
            className="no-wrap"
            size="sm"
            style={{ cursor: "pointer" }}
          >
            <Flex align="center" gap={5}>
              {showIcon && <TbCopy size={16} />}
              {label || value}
            </Flex>
          </Text>
        </Tooltip>
      )}
    </CopyButton>
  );
};
