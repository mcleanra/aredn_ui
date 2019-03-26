import { ChartPageDataService } from "./app/chart-page-data.service";

declare namespace ArednApi {

    interface ApiResponse {
        pages: {
            status?: StatusPage,
            chart?: ChartPage
        };
    }

    interface StatusPage {
        meshrf?: MeshRf;
        memory?: Memory;
        storage?: Storage;
        sysinfo?: SysInfo;
        location?: Location;
        olsr?: OLSR;
        ip?: IPAddresses;
    }

    interface SysInfo {
        date: string;
        uptime: string;
        time: string;
        model: string;
        // TODO: Remove
        location?: Array<any>;
        loads: number[];
        node: string;
        firmware_version: string;
    }

    interface Storage {
        rootfree: number;
        tmpfree: number;
    }

    interface Memory {
        freeram: number;
        sharedram: number;
        bufferram: number;
    }

    interface MeshRf {
        band: string;
        ssid: string;
        channel: string;
        device: string;
        chanbw: string;
        frequency: string;
    }

    interface Location {
        lat: string;
        lon: string;
        gridsquare: string;
    }

    interface OLSR {
        nodes: string;
        entries: string;
    }

    interface IPAddresses {
        wifi: string;
        wan: string;
        gateway: string;
        lan: string;
    }

    interface ChartPage {
        realtime?: [SignalResult[]],
        archive?: [SignalResult[]]
    }

    interface SignalResult {
        tx_mcs: string;
        rx_mcs: string;
        label: string;
        m: number; //margin (signal - noise) in dB
        y: [number | null, number | null]; //[signal, noise] in dBm
        x: number; //seconds since epoch?
        rx_rate: string; //Mbps
        tx_rate: string; //Mbps
    }
}