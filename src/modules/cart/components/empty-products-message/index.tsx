import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyProductsMessage = () => {
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-products-message">
      {/* <Heading
        level="h1"
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
      >
        No products found
      </Heading> */}
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        Nothing here yet. Coming soon. 
      </Text>
      <div>
        <InteractiveLink href="/store">Explore products</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyProductsMessage
