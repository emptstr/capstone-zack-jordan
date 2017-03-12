import {Injectable} from "@angular/core";

@Injectable()
export class PasswordService { //TODO implement me

    public hashPassword(password: string, salt: string): string{
        return password;
    }

    public genSalt(): string{
        return "";
    }

}