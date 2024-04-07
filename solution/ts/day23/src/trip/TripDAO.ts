import CollaboratorCallException from "../exception/CollaboratorCallException";
import Trip from "./Trip";
import {User} from "../user/User";

export default class TripDAO {
    public static findTripsByUser(user: User): Trip[] {
        throw new CollaboratorCallException(
            "TripDAO should not be invoked on an unit test.");
    }
}
