import { ConfigurationType } from "../enums/configuration";

export interface IConfiguration {
    key: string;
    type: ConfigurationType;
    description: string;
    value: string;
}

export interface IConfigurationResponse extends IConfiguration {
    id: number;
}