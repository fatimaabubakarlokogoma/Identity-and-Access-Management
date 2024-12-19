;; Device Identity Contract

(define-map devices
  principal
  {
    did: (string-utf8 100),
    metadata: (string-utf8 500),
    owner: principal,
    active: bool
  }
)

(define-public (register-device (did (string-utf8 100)) (metadata (string-utf8 500)))
  (let
    ((device {did: did, metadata: metadata, owner: tx-sender, active: true}))
    (asserts! (is-none (map-get? devices tx-sender)) (err u403))
    (ok (map-set devices tx-sender device))
  )
)

(define-public (update-device-metadata (metadata (string-utf8 500)))
  (let
    ((device (unwrap! (map-get? devices tx-sender) (err u404))))
    (ok (map-set devices tx-sender (merge device {metadata: metadata})))
  )
)

(define-public (transfer-device (new-owner principal))
  (let
    ((device (unwrap! (map-get? devices tx-sender) (err u404))))
    (asserts! (is-eq (get owner device) tx-sender) (err u403))
    (ok (map-set devices new-owner (merge device {owner: new-owner})))
  )
)

(define-public (deactivate-device)
  (let
    ((device (unwrap! (map-get? devices tx-sender) (err u404))))
    (asserts! (is-eq (get owner device) tx-sender) (err u403))
    (ok (map-set devices tx-sender (merge device {active: false})))
  )
)

(define-read-only (get-device-info (device-principal principal))
  (ok (unwrap! (map-get? devices device-principal) (err u404)))
)

