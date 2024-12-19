;; Firmware Updates Contract

(define-map firmware-versions
  {device: principal, version: (string-utf8 20)}
  {
    hash: (buff 32),
    url: (string-utf8 200),
    timestamp: uint
  }
)

(define-public (publish-firmware-update (device principal) (version (string-utf8 20)) (hash (buff 32)) (url (string-utf8 200)))
  (ok (map-set firmware-versions
    {device: device, version: version}
    {
      hash: hash,
      url: url,
      timestamp: block-height
    }
  ))
)

(define-read-only (get-firmware-version (device principal) (version (string-utf8 20)))
  (ok (unwrap! (map-get? firmware-versions {device: device, version: version}) (err u404)))
)

(define-public (verify-firmware-integrity (device principal) (version (string-utf8 20)) (claimed-hash (buff 32)))
  (let
    ((firmware-info (unwrap! (map-get? firmware-versions {device: device, version: version}) (err u404))))
    (ok (is-eq (get hash firmware-info) claimed-hash))
  )
)

