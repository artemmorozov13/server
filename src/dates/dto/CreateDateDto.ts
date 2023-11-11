
import { TimeModel } from "src/times/times.model"

export class CreateDateDto {
    readonly date: string
    readonly times: TimeModel[]
    readonly userId: number;
}