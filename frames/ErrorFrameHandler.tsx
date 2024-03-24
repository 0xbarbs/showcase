/** @jsxImportSource frog/jsx */
import { Button } from "frog";

import { Box } from "@/components/shared/Box";
import { Text } from "@/components/shared/Text";
import { FrameContainer } from "@/components/shared/FrameContainer";

export const ErrorFrameHandler = async (c: any) => {
  return c.res({
    image: (
      <FrameContainer>
        <Box p={'32px 64px'} align={'center'} justify={'center'} fill>
          <Text size={100}>
            ⚠️
          </Text>
          <Text align={'center'} size={80}>
            Sorry an error occurred, please re-export your frames.
          </Text>
        </Box>
      </FrameContainer>
    ),
    intents: [
      <Button.Reset>⬅️ Go back</Button.Reset>,
    ],
  })
}