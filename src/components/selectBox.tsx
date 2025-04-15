import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface SelectBoxProps {
  clickOption: (num: number) => void;
  displayValue: number;
}

const SelectBox = ({ clickOption, displayValue }: SelectBoxProps) => {
  return (
    <Select onValueChange={(value) => clickOption(Number(value))}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder={String(displayValue)} />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup >
          <SelectItem value="10">
            10
          </SelectItem>
          <SelectItem value="20">
            20
          </SelectItem>
          <SelectItem value="50">
            50
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectBox