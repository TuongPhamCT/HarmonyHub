import { sMainController } from "../../../store";

export const toggleMainContentScroll = (value) => {
    sMainController.set((v) => v.value.canScroll = value);
}