"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, ChevronDownMini, XMark } from "@medusajs/icons"
import { clx, useToggleState } from "@medusajs/ui"
import React, { Fragment, useState } from "react"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"

const SideMenuItems = {
  Home: "/",
  About: "/about",
  Shop: "/store",
  Account: "/account",
  Cart: "/cart",
}

const DropdownSection: React.FC<{ 
  title: string
  isOpen: boolean
  onToggle: () => void
  children?: React.ReactNode 
}> = ({ 
  title, 
  isOpen, 
  onToggle, 
  children 
}) => (
  <div className="border-b border-gray-200 font-sans">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full py-4 text-left text-sm font-medium text-gray-900 hover:text-gray-700"
    >
      {title}
      <ChevronDownMini
        className={clx(
          "h-4 w-4 transition-transform duration-200",
          isOpen ? "rotate-180" : ""
        )}
      />
    </button>
    {isOpen && children && (
      <div className="pb-4 pl-4">
        {children}
      </div>
    )}
  </div>
)

const SideMenu = ({ 
  regions,
  categories = [],
  collections = []
}: { 
  regions: HttpTypes.StoreRegion[] | null
  categories?: HttpTypes.StoreProductCategory[]
  collections?: HttpTypes.StoreCollection[]
}) => {
  const toggleState = useToggleState()
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [collectionOpen, setCollectionOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base text-coralis-base"
                >
                  Menu
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <PopoverPanel className="flex flex-col fixed w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm text-ui-fg-on-color m-2 backdrop-blur-2xl">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-white rounded-rounded shadow-lg text-coralis-base justify-between"
                  >
                    {/* Header with close button */}
                    <div className="flex justify-end p-6 pb-0" id="xmark">
                      <button data-testid="close-menu-button" onClick={close}>
                        <XMark />
                      </button>
                    </div>

                    {/* Main content area */}
                    <div className="flex-1 overflow-y-auto px-6">
                      {/* SHOP Section */}
                      <div className="my-8">
                        <h2 className="text-2xl font-seasons font-semibold mb-6 text-coralis-base">SHOP</h2>
                        
                        {/* BY CATEGORY */}
                        <DropdownSection
                          title="BY CATEGORY"
                          isOpen={categoryOpen}
                          onToggle={() => setCategoryOpen(!categoryOpen)}
                        >
                          <ul className="space-y-2 font-sans">
                            {categories.map((category) => (
                              <li key={category.id}>
                                <LocalizedClientLink
                                  href={`/categories/${category.handle}`}
                                  className="text-sm text-gray-600 hover:text-gray-900"
                                  onClick={close}
                                >
                                  {category.name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        </DropdownSection>

                        {/* BY COLLECTION */}
                        <DropdownSection
                          title="BY COLLECTION"
                          isOpen={collectionOpen}
                          onToggle={() => setCollectionOpen(!collectionOpen)}
                        >
                          <ul className="space-y-2">
                            {collections.map((collection) => (
                              <li key={collection.id}>
                                <LocalizedClientLink
                                  href={`/collections/${collection.handle}`}
                                  className="text-sm text-gray-600 hover:text-gray-900"
                                  onClick={close}
                                >
                                  {collection.title}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        </DropdownSection>
                      </div>

                      {/* ABOUT US Section */}
                      <h2 className="text-2xl font-seasons font-semibold mb-6 text-coralis-base">ABOUT US</h2>

                      <div className="mb-8 font-sans">
                       
                          <ul className="space-y-2">
                            <li>
                              <LocalizedClientLink
                                href="/about"
                                className="text-sm text-gray-600 hover:text-gray-900"
                                onClick={close}
                              >
                                Our Story
                              </LocalizedClientLink>
                            </li>
                            <li>
                              <LocalizedClientLink
                                href="/contact"
                                className="text-sm text-gray-600 hover:text-gray-900"
                                onClick={close}
                              >
                                Contact Us
                              </LocalizedClientLink>
                            </li>
                          </ul>
                      </div>
                    </div>

                    {/* Bottom section */}
                    <div className="px-6 pb-6 border-t border-gray-200 pt-4">
                      <div className="space-y-3 mb-6">
                        <LocalizedClientLink
                          href="/account"
                          className="block text-sm text-gray-900 hover:text-gray-700"
                          onClick={close}
                        >
                          Log in
                        </LocalizedClientLink>
                        <LocalizedClientLink
                          href="/account"
                          className="block text-sm text-gray-900 hover:text-gray-700"
                          onClick={close}
                        >
                          Create account
                        </LocalizedClientLink>
                      </div>

                      {/* Country selector */}
                      <div
                        className="flex justify-between items-center"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
