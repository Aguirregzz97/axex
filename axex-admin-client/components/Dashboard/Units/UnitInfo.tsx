import React from "react"
import { List, ListIcon, ListItem } from "@chakra-ui/layout"
import { Spinner } from "@chakra-ui/react"
import { RiHashtag, RiLineHeight, RiMoneyDollarBoxLine } from "react-icons/ri"
import { useRouter } from "next/router"
import AxexListItem from "../../AxexListItem"
import AnimatedSection from "../../AnimatedSection"
import useUnit from "../../../api/queries/Units/useUnit"

const UnitInfo: React.FC = () => {
  const router = useRouter()
  const id: string = router.query.id as string
  if (!id) return <></>

  const { data: unit, isLoading: isLoadingUnit } = useUnit(id)

  return (
    <AnimatedSection delay={0.3}>
      <AxexListItem
        title="Unit"
        description="Resident Unit Information"
        content={
          <List spacing={1}>
            {isLoadingUnit && <Spinner size="lg" />}
            <ListItem>
              <ListIcon as={RiLineHeight} color="#1e6e7d" />
              Floor <strong>{unit?.floor}</strong>
            </ListItem>
            <ListItem>
              <ListIcon as={RiHashtag} color="#1e6e7d" />
              Room Number <strong>{unit?.roomNumber}</strong>
            </ListItem>
            {unit?.monthlyAmount && (
              <ListItem>
                <ListIcon as={RiMoneyDollarBoxLine} color="#1e6e7d" />
                Monthly Payment <strong>{unit?.monthlyAmount}$</strong>
              </ListItem>
            )}
          </List>
        }
      />
    </AnimatedSection>
  )
}

export default UnitInfo
