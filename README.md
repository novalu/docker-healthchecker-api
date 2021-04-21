# Docker Healthchecker API

## CLI

### Images:

| Parameter | Description | Type | Default |
| ---- | ----------- | ---- | ---- |
| -i, --image | Docker image to check. Could be defined more times. | string | `''` |
| -f, --file | JSON file with image definition in format `[{name: string, image: string, alias: string}, ...]`, where there should be at least `name` or `image`. Parameter `alias` is optional. | string | `''` |

### Server:

| Parameter | Description | Type | Default |
| ---- | ----------- | ---- | ------ |
| --p, --port | Port, on which will server run | number | 8080 |
| --https | Enable HTTPS | boolean | false |
| --cert | Path to the HTTPS certificate file | string | `''` |
| --key | Path to the HTTPS private key file | string | `''` |
| --ca | Path to HTTPS certificate authorities. Could be repeated more times. Optional. | string | `''` |
| --passphrase | HTTPS passphrase. Optional. | string | `''` |

### Options:

| Parameter | Description | Type |
| ---- | ----------- | ---- |
| --version | Show version number | --- |
| -h, --help | Show help | --- |