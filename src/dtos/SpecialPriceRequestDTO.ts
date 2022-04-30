import SpecialPriceDTO from './SpecialPriceDTO';

type SpecialPriceRequestDTO = Omit<SpecialPriceDTO, "id" | "active">
export default SpecialPriceRequestDTO