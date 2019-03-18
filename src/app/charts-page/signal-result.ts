export class SignalResult {
    tx_mcs: string;
    rx_mcs: string;
    label: string;
    m: number; //margin (signal - noise) in dB
    y: [number | null, number | null]; //[signal, noise] in dBm
    x: number; //seconds since epoch?
    rx_rate: string; //Mbps
    tx_rate: string; //Mbps
}