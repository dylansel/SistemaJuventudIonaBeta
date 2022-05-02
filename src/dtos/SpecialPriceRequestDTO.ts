import SpecialPriceDTO from './SpecialPriceDTO';

type SpecialPriceRequestDTO = Omit<SpecialPriceDTO, "id" |"familySurname" |"janijim" >
export default SpecialPriceRequestDTO