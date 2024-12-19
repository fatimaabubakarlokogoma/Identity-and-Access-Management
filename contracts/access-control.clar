;; Access Control Contract

(define-map access-policies
  {device: principal, resource: (string-utf8 100)}
  {allowed: (list 10 principal)}
)

(define-public (set-access-policy (device principal) (resource (string-utf8 100)) (allowed (list 10 principal)))
  (ok (map-set access-policies {device: device, resource: resource} {allowed: allowed}))
)

(define-public (check-access (device principal) (resource (string-utf8 100)))
  (let
    ((policy (unwrap! (map-get? access-policies {device: device, resource: resource}) (err u404))))
    (ok (is-some (index-of (get allowed policy) tx-sender)))
  )
)

(define-read-only (get-access-policy (device principal) (resource (string-utf8 100)))
  (ok (unwrap! (map-get? access-policies {device: device, resource: resource}) (err u404)))
)

